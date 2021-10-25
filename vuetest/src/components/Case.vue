<template>
    <div>
        <template>
            <v-tabs :value="0" background-color="primary">
                <v-tab @click="$router.push({ name: 'Case' })">用例管理</v-tab>
                <v-tab @click="$router.push({ name: 'Task' })">任务管理</v-tab>
                <v-tab @click="$router.push({ name: 'Jenkins' })">Jenkins管理</v-tab>
                <v-tab @click="$router.push({ name: 'Report' })">报告管理</v-tab>
            </v-tabs>
        </template>
        <v-dialog
          v-model="creatTask"
          max-width="500px"
        >
        <v-card>
          <v-card-title>
            生成测试任务
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field label="任务名称" v-model="addTask.name"></v-text-field>
              <v-textarea label="备注" v-model="addTask.remark"></v-textarea>
            </v-container>
          </v-card-text>
           <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="newTask()">确定</v-btn>
            <v-btn color="primary" text @click="creatTask = false">取消</v-btn>
           </v-card-actions>
        </v-card>
        </v-dialog>

        <v-dialog
          v-model="editDialog"
          max-width="500px"
        >
        <v-card>
          <v-card-title>
            修改测试用例
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field label="用例名称" v-model="editItem.caseName"></v-text-field>
              <v-textarea label="用例数据" v-model="editItem.caseData"></v-textarea>
            </v-container>
          </v-card-text>
           <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="confirmEdit()">确定</v-btn>
            <v-btn color="primary" text @click="editDialog = false">取消</v-btn>
           </v-card-actions>
        </v-card>
        </v-dialog>

        <v-dialog
          v-model="addDialog"
          max-width="500px"
        >
        <v-card>
          <v-card-title>
            添加测试用例
          </v-card-title>
          <v-card-text>
            <v-container>
                <v-text-field label="用例名称" v-model="addItem.name"></v-text-field>
                <v-select :items="selectItem" label="用例类型" v-model="addItem.type"></v-select>
                <v-textarea label="用例数据" v-model="addItem.data" v-if="addItem.type=='文本'"></v-textarea>
                <v-file-input label="用例数据" v-model="addItem.file" v-if="addItem.type=='文件'" outlined dense ></v-file-input>
                <v-text-field label="备注" v-model="addItem.remark"></v-text-field>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="addCase">确定</v-btn>
            <v-btn color="primary" text @click="addDialog = false">取消</v-btn>
          </v-card-actions>
        </v-card>
        </v-dialog>

        <v-btn color="primary" class="btn" @click="addDialog = true">添加用例</v-btn>
        <v-btn color="success" class="btn" @click="creatTask = true">生成任务</v-btn>

        <template>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
            >
            <template v-slot:[`item.operate`] = "{item}">
            <v-btn color="primary" text small @click="editCase(item)">编辑</v-btn>
            <v-btn color="error" text small @click="deleteCase(item)">删除</v-btn>
            </template>
            </v-data-table>
        </template>
    </div>
</template>

<script>
export default {
  data () {
    return {
      addDialog: false,
      editDialog: false,
      selectItem: ['文本', '文件'],
      editItem: {},
      addTask: {
        name: '',
        remark: ''
      },
      addItem: {
        name: '',
        type: '',
        data: '',
        remark: ''
      },
      selected: [],
      headers: [
        {
          text: 'id',
          value: 'id'
        },
        {
          text: '用例名称',
          value: 'caseName'
        },
        {
          text: '用例数据',
          value: 'caseData'
        },
        {
          text: '操作',
          value: 'operate'
        }
      ],
      desserts: []

    }
  },
  created () {
    const postData = {
      pageNum: 1,
      pageSize: 10
    }
    this.$api.cases.getList(postData).then(res => {
      console.log(res)
      this.desserts = res.data.data.data
    })
  },
  methods: {
    addCase () {
      console.log(this.addItem)
      if (this.addItem.type === '文本') {
        const postData = {
          caseData: this.addItem.data,
          caseName: this.addItem.name,
          remark: this.addItem.remark
        }
        this.$api.cases.createCaseByText(postData).then(res => {
          console.log(res)
          this.addDialog = false
        })
      } else if (this.addItem.type === '文件') {
        const postData = new FormData()
        postData.append('caseFile', this.addItem.file)
        postData.append('caseData', this.addItem.data)
        postData.append('caseName', this.addItem.name)
        this.$api.cases.createCaseByFile(postData).then(res => {
          console.log(res)
        })
      }
      this.addDialog = false
      const postData = {
        pageNum: 1,
        pageSize: 10
      }
      this.$api.cases.getList(postData).then(res => {
        console.log(res)
        this.desserts = res.data.data.data
      })
    },
    editCase (item) {
      this.editDialog = true
      this.editItem = item
    },
    confirmEdit (item) {
      const postData = {
        caseData: this.editItem.caseData,
        caseName: this.editItem.caseName,
        id: this.editItem.id,
        remark: this.editItem.remark
      }
      this.$api.cases.editCase(postData).then(res => {
        console.log(res)
        this.editDialog = false
        const postData = {
          pageNum: 1,
          pageSize: 10
        }
        this.$api.cases.getList(postData).then(res => {
          console.log(res)
          this.desserts = res.data.data.data
        })
      })
    },
    deleteCase (item) {
      const postData = {
        caseId: item.id
      }
      this.$api.cases.deleteCase(postData).then(res => {
        console.log(res)
        const postData = {
          pageNum: 1,
          pageSize: 10
        }
        this.$api.cases.getList(postData).then(res => {
          console.log(res)
          this.desserts = res.data.data.data
        })
      })
    },
    newTask () {
      console.log(this.selected)
      const caseIdList = []
      for (let i = 0; i < this.selected.length; i++) {
        caseIdList.push(this.selected[i].id)
      }
      const postData = {
        caseIdList: caseIdList,
        testTask: {
          name: this.addTask.name,
          remark: this.addTask.remark,
          testJenkinsId: 1
        }
      }
      this.$api.cases.createTask(postData).then(res => {
        console.log(res)
      })
    }
  }
}

</script>

<style scoped>
.btn {
  margin: 10px;
}
</style>
