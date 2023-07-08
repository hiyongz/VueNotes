
<template>
  <div>
    <v-card flat>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-text-field
              v-model="name"
              color="purple darken-2"
              label="name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="testcases"
              color="purple darken-2"
              label="testcases"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" elevation="3" large>创建 Suite</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      single-select
      item-key="id"
      show-select
      class="elevation-1"
    >
    </v-data-table>
    <div class="text-center pt-2">
        <v-btn color="primary" elevation="3" large @click="run">运行 Suite</v-btn>
    </div>
    
  </div>
</template>

<script>
import axios from "../http/http";

export default {
  data: () => ({
    name: "",
    testcases: "",
    selected: [],
    headers: [
      { text: "id", value: "id" },
      { text: "name", value: "name" },
      { text: "testcases", value: "testcases" },
    ],
    desserts: [],
  }),

  methods: {
    initialize() {
      axios
        .request({
          url: "/suite",
          method: "get",
        })
        .then((response) => {
          this.desserts = response.data;
        });
    },
    run() {
        var id=this.selected[0].id
        axios.request({
            url: '/execution',
            method: 'post',
            data: {
                suite_id: id
            }
        }).then(response => {
            console.log(response.data)
        })

    }
  },
  created() {
    this.initialize();
  },
};
</script>