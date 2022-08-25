<script lang="ts" setup>
//表格数据
import {reactive, ref} from "vue";
import {ElTree, FormInstance} from "element-plus";

const tableData = [
  {
    id: 1,
    name: '系统管理员',
  },
  {
    id: 2,
    name: '资源管理员',
  },
]

//操作
const handleDelClick = (scope: any) => {
  console.log('handleDelClick ',scope.id)
}

const handleUpdateClick = (dialogFormVisible: boolean,row: any) => {
  console.log('handleUpdateClick',row)
  updateForm.id = row.id
  updateForm.name = row.name

}

const handleInsertClick = (dialogFormVisible: boolean,row: any) => {
  console.log('handleInsertClick ',row)
  insertForm.parentId = row.id

}

const handlePermissionClick = (dialogFormVisible: boolean,row: any) => {
  console.log('handlePermissionInsert ',row)
  roleId.value = row.id
  //获取tree数据 并获取用户所拥有tree数据 并选中
  getPermission()

}

//添加
const insertFormInstance = ref<FormInstance>()
const dialogFormVisibleInsert = ref(false)
const formLabelWidth = '140px'

const insertForm = ref<any>(
    {
      name: ''
    }
)
//重置表单
const resetFormInsert = (dialogFormVisible: boolean) => {
  insertForm.name = ''
}
const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('名称不能为空'))
  }else {
    callback()
  }
}
//校验规则
const rules = reactive({
  name: [{ validator: validateName, trigger: 'blur' }],
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
})
//重置表单
const resetFormUpdate = (dialogFormVisible: boolean) => {
  updateForm.name = ''
}
const validateUpdateName = (rule: any, value: any, callback: any) => {
  console.log('name',value)
  if (value === '') {
    callback(new Error('名称不能为空'))
  }else {
    callback()
  }
}
//校验规则
const updateRules = reactive({
  name: [{ validator: validateUpdateName, trigger: 'blur' }],
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
//授权
const roleId = ref<any>(0)
const dialogFormVisiblePermission = ref(false)
//默认展开的选项
const defaultExpandedKeys = ref<any>([])
//默认选中的选项
const defaultCheckedKeys = ref<any>([])
const treeRef = ref<InstanceType<typeof ElTree>>()

//获取菜单权限
const getPermission = () => {
//  获取全部的菜单内容

//获取所有数据的defaultExpandedKeys
  getDefaultExpandedKeys(allData)
//  根据选中的角色id查询对应的菜单内容

  //获取用户权限数据的defaultCheckedKeys
  getDefaultCheckedKeys(userData)
}
//获取所有数据的defaultExpandedKeys
const getDefaultExpandedKeys = (allData: any) => {
  allData.forEach((item: any) => {
    if(item.children !== undefined){
      getDefaultExpandedKeys(item.children)
    }
    defaultExpandedKeys.value.push(item.id)
  })
}
//获取用户权限数据的defaultCheckedKeys
const getDefaultCheckedKeys = (userData: any) => {
//  根据选中的角色id查询对应的菜单内容
  userData.forEach((item: any) => {
    if(item.children === undefined){
      defaultCheckedKeys.value.push(item.id)
    }else {
      getDefaultCheckedKeys(item.children)
    }
  })
}
//获取Checked的所有keys
const getCheckedKeys = () => {
  console.log(treeRef.value!.getCheckedKeys(false))
}

//tree数据
const defaultProps = {
  children: 'children',
  label: 'label',
}
//全部的菜单数据
const allData = reactive(
    [
      {
        id: 1,
        label: '全部数据',
        children: [
          {
            id: 20,
            label: '菜单管理',
            children: [
              {
                id: 41,
                label: '查询',
              },
              {
                id: 42,
                label: '添加',
              },
              {
                id: 43,
                label: '修改',
              },
              {
                id: 44,
                label: '删除',
              },
            ],
          },
          {
            id: 21,
            label: '角色管理',
            children: [
              {
                id: 45,
                label: '查询',
              },
              {
                id: 46,
                label: '添加',
              },
              {
                id: 47,
                label: '修改',
              },
              {
                id: 48,
                label: '删除',
              },
            ],
          },
          {
            id: 22,
            label: '用户管理',
            children: [
              {
                id: 49,
                label: '查询',
              },
              {
                id: 50,
                label: '添加',
              },
              {
                id: 51,
                label: '修改',
              },
              {
                id: 52,
                label: '删除',
              },
            ],
          },
        ],
      },
    ]
)
//用户拥有的菜单数据
const userData = reactive(
    [
      {
        id: 20,
        label: '菜单管理',
        children: [
          {
            id: 41,
            label: '查询',
          },
          {
            id: 42,
            label: '添加',
          },
        ],
      },
      {
        id: 21,
        label: '角色管理',
        children: [
          {
            id: 45,
            label: '查询',
          },
          {
            id: 46,
            label: '添加',
          },
        ],
      },
      {
        id: 22,
        label: '管理'
      },
    ]
)
//提交修改
const onSubmitPermission = () => {



}
</script>

<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column fixed="right" label="操作" width="220">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleDelClick(scope.row)">删除</el-button>
          <el-button link type="primary" size="small" @click="handleUpdateClick(dialogFormVisibleUpdate=true,scope.row)">修改</el-button>
          <el-button link type="primary" size="small" @click="handleInsertClick(dialogFormVisibleInsert=true,scope.row)">添加</el-button>
          <el-button link type="primary" size="small" @click="handlePermissionClick(dialogFormVisiblePermission=true,scope.row)">角色授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    dialog添加表单-->
    <el-dialog v-model="dialogFormVisibleInsert" title="添加">
      <el-form :model="insertForm" ref="insertFormInstance" :rules="rules">
        <!--        父id-->
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="insertForm.name" autocomplete="off"/>
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
        <el-form-item>
          <el-button @click="resetFormUpdate(dialogFormVisibleUpdate=false)">取消</el-button>
          <el-button type="primary" @click="onSubmitUpdate(updateFormInstance)">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    dialog授权-->
    <el-dialog v-model="dialogFormVisiblePermission" title="授权">
      <el-tree
          ref="treeRef"
          :data="allData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckedKeys"
          :props="defaultProps"
      />
      <el-button type="primary" @click="onSubmitPermission(dialogFormVisiblePermission = false)">提交</el-button>
    </el-dialog>
  </div>
</template>


<style scoped lang="scss">

</style>
