<template>

    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://ceshiren.com/uploads/default/original/1X/809c63f904a37bc0c6f029bbaf4903c27f03ea8a.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              霍格沃兹测试学院演练项目
            </v-list-item-title>
            <v-list-item-subtitle>seveniruby@ceshiren.com</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
          >
        
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>

          </v-list-item>
          
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>


<script>
  export default {
    data: () => ({
      selectedItem: 0,
      items: [
        { text: '项目详情', icon: 'mdi-folder', to: "/1"  },
        { text: '测试用例', icon: 'mdi-account-multiple', to: "/testcase" },
        { text: '测试套件', icon: 'mdi-star' , to: "/1" },
        { text: '测试结果', icon: 'mdi-history' , to: "/1" },
        { text: '测试报告', icon: 'mdi-check-circle' , to: "/1" },
        { text: '配置', icon: 'mdi-upload' , to: "/login" },
        { text: '个人资料', icon: 'mdi-cloud-upload', to: "/form" },
      ],
    }),
  }
</script>