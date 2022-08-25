<script lang="ts" setup>
//数据表格
import {reactive, ref} from "vue";
import {FormInstance, FormRules} from "element-plus";

interface User {
  id: number
  name: string
  url: string
  componentUrl: string
  permissionValue: string
  children?: User[]
}

const tableData: User[] = [
  {
    id: 0,
    name: '全部数据',
    url: '',
    componentUrl: '',
    permissionValue: '',
    children: [
      {
        id: 20,
        name: '用户管理',
        url: '/emp',
        componentUrl: '/emp',
        permissionValue: '',
        children: [
          {
            id: 41,
            name: '查看',
            url: '/select',
            componentUrl: '/empTable',
            permissionValue: 'select',
          },
          {
            id: 42,
            name: '修改',
            url: '/update',
            componentUrl: '',
            permissionValue: 'update',
          },
          {
            id: 43,
            name: '添加',
            url: '/insert',
            componentUrl: '',
            permissionValue: 'insert',
          },
        ]
      },
      {
        id: 21,
        name: '角色管理',
        url: '/role',
        componentUrl: '/role',
        permissionValue: '',
      },
      {
        id: 22,
        name: '授权管理',
        url: '/authorize',
        componentUrl: '/authorize',
        permissionValue: '',
      },
    ]
  },
]

const handleDelClick = (scope: any) => {
  console.log('handleDelClick ',scope.id)
}

const handleUpdateClick = (dialogFormVisible: boolean,row: any) => {
  console.log('handleUpdateClick',row)
  updateForm.id = row.id
  updateForm.name = row.name
  updateForm.url = row.url
  updateForm.componentUrl = row.componentUrl
  updateForm.permissionValue = row.permissionValue
}

const handleInsertClick = (dialogFormVisible: boolean,row: any) => {
  console.log('handleInsertClick ',row)
  insertForm.parentId = row.id

}
//添加表单
const insertFormInstance = ref<FormInstance>()
const dialogFormVisibleInsert = ref(false)
const formLabelWidth = '140px'

const insertForm = reactive({
  //父id
  parentId: 0,
  //名称
  name: '',
  //接口访问路径
  url: '',
  //组件路径
  componentUrl: '',
  //权限值
  permissionValue: '',
})
//重置表单
const resetFormInsert = (dialogFormVisible: boolean) => {
  insertForm.name = ''
  insertForm.url = ''
  insertForm.componentUrl = ''
  insertForm.permissionValue = ''
}
const validateName = (rule: any, value: any, callback: any) => {
  console.log('name',value)
  if (value === '') {
    callback(new Error('名称不能为空'))
  }else {
    callback()
  }
}
const validateUrl = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('路径不能为空'))
  }else {
    callback()
  }
}
//校验规则
const rules = reactive({
  name: [{ validator: validateName, trigger: 'blur' }],
  url: [{ validator: validateUrl, trigger: 'blur' }],
})
//表单提交
const onSubmitInsert = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log('提交添加 ',insertForm)
    } else {
      console.log('信息校验错误', fields)
      return false
    }
  })
}
//修改表单
const updateFormInstance = ref<FormInstance>()
const dialogFormVisibleUpdate = ref(false)
const updateForm = reactive({
  //id
  id: 0,
  //名称
  name: '',
  //接口访问路径
  url: '',
  //组件路径
  componentUrl: '',
  //权限值
  permissionValue: '',
})
//重置表单
const resetFormUpdate = (dialogFormVisible: boolean) => {
  updateForm.name = ''
  updateForm.url = ''
  updateForm.componentUrl = ''
  updateForm.permissionValue = ''
}
const validateUpdateName = (rule: any, value: any, callback: any) => {
  console.log('name',value)
  if (value === '') {
    callback(new Error('名称不能为空'))
  }else {
    callback()
  }
}
const validateUpdateUrl = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('路径不能为空'))
  }else {
    callback()
  }
}
//校验规则
const updateRules = reactive({
  name: [{ validator: validateUpdateName, trigger: 'blur' }],
  url: [{ validator: validateUpdateUrl, trigger: 'blur' }],
})
//表单提交
const onSubmitUpdate = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log('提交修改 ',insertForm)
    } else {
      console.log('信息校验错误', fields)
      return false
    }
  })
}

//搜索框
const statusOptions = ref( ['published', 'draft', 'deleted'] )
const showReviewer = ref( false )
const dialogFormVisible = ref( false )
const dialogStatus = ref( '' )
const dialogPvVisible = ref( false )
const pvData = ref( [] )
const downloadLoading = ref( false )

const searchList = reactive(
    {
      name: ''
    }
)
//搜索
const search = () => {
  if(searchList.name != ''){
    console.log('搜索 ',searchList.name)

  }
}

</script>

<template>
  <div>
    <div class="filter-container">
      <el-input style="width: 130px" v-model="searchList.name" placeholder="搜索" />
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
      <el-table-column prop="name" label="名称" sortable width="180" />
      <el-table-column prop="url" label="访问路径" sortable width="180" />
      <el-table-column prop="componentUrl" label="组件路径" sortable width="180" />
      <el-table-column prop="permissionValue" label="权限值" sortable width="180" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleDelClick(scope.row)">删除</el-button>
          <el-button link type="primary" size="small" @click="handleUpdateClick(dialogFormVisibleUpdate=true,scope.row)">修改</el-button>
          <el-button link type="primary" size="small" @click="handleInsertClick(dialogFormVisibleInsert=true,scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    dialog添加表单-->
    <el-dialog v-model="dialogFormVisibleInsert" title="添加">
      <el-form :model="insertForm" ref="insertFormInstance" :rules="rules">
<!--        父id-->
        <input type="hidden" :value="insertForm.parentId">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="insertForm.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="路径" :label-width="formLabelWidth" prop="url">
          <el-input v-model="insertForm.url" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="组件路径" :label-width="formLabelWidth">
          <el-input v-model="insertForm.componentUrl" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="权限值" :label-width="formLabelWidth">
          <el-input v-model="insertForm.permissionValue" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetFormInsert(dialogFormVisibleInsert=false)">取消</el-button>
          <el-button type="primary" @click="onSubmitInsert(insertFormInstance)">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    dialog修改表单-->
    <el-dialog v-model="dialogFormVisibleUpdate" title="修改">
      <el-form :model="updateForm" ref="updateFormInstance" :rules="rules">
        <!--        id-->
        <input type="hidden" :value="updateForm.id">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="updateForm.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="路径" :label-width="formLabelWidth" prop="url">
          <el-input v-model="updateForm.url" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="组件路径" :label-width="formLabelWidth">
          <el-input v-model="updateForm.componentUrl" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="权限值" :label-width="formLabelWidth">
          <el-input v-model="updateForm.permissionValue" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetFormUpdate(dialogFormVisibleUpdate=false)">取消</el-button>
          <el-button type="primary" @click="onSubmitUpdate(updateFormInstance)">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<style scoped lang="scss">

</style>
