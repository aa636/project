<script lang="ts" setup>

//表格数据
import {reactive, ref} from "vue";
import {FormInstance} from "element-plus";

const tableData = [
  {
    id: '1',
    username: 'Tom',
    avatar: 'src/assets/img/userAvatar/80392830_p0.jpg',
    age: 21,
    sex: '男',
    phone: '17852452568',
    name: '张三',
    idCard: '415245200204301254',
    state: 0,
    stateStr: '',
    createTime: '2022年08月25日',
  },
]
//获取到的数据表格
const getTableData = ref<any>()

//获取数据表格数据
const getData = () => {
//  获取动态数据

//  处理动态数据赋值
//   getTableData.value =
//  处理静态数据
  tableData.forEach((item: any) => {
    if(item.state === 0){
      item.stateStr = '未禁用'
    }
    if(item.state === 1){
      item.stateStr = '禁用'
    }
  })
}
//获取数据
getData()

const handleDelClick = (scope: any) => {
  console.log('handleDelClick ',scope.id)
//  删除对应id的用户

}

const handleUpdateClick = (dialogFormVisible: boolean,row: any) => {
  console.log('handleUpdateClick',row)
  updateForm.id = row.id
  updateForm.username = row.username
  updateForm.sexStr = row.sex
  updateForm.phone = row.phone
  updateForm.name = row.name
  updateForm.idCard = row.idCard
  updateForm.stateStr = row.stateStr
  //处理表单字段
  implementDataUpdate()
}

const handleRoleClick = (dialogFormVisible: boolean,row: any) => {
  console.log('handleRoleClick',row.id)
  //请求该用户的所有角色
  getRoleData(row.id)
}

//添加表单
const insertFormInstance = ref<FormInstance>()
const dialogFormVisibleInsert = ref(false)
const formLabelWidth = '140px'

const insertForm = reactive({
  username: '',
  // avatar: '',
  // age: '',
  sex: -1,
  sexStr: '男',
  phone: '',
  name: '',
  idCard: '',
  state: '',
})
//重置表单
const resetFormInsert = (dialogFormVisible: boolean) => {
  insertForm.username = ''
  // insertForm.avatar = ''
  // insertForm.age = ''
  insertForm.sexStr = '男'
  insertForm.phone = ''
  insertForm.name = ''
  insertForm.idCard = ''
  // insertForm.state = ''
  // insertForm.createTime = ''
}
//处理提交的表单数据
const implementDataInsert = () => {
  //1男 0女
  if(insertForm.sexStr === '男'){
    insertForm.sex = 1
  }
  if(insertForm.sexStr === '女'){
    insertForm.sex = 0
  }
}
//处理提交的表单数据
const implementDataUpdate = () => {
  //1男 0女
  if(updateForm.sexStr === '男'){
    updateForm.sex = 1
  }
  if(updateForm.sexStr === '女'){
    updateForm.sex = 0
  }
  //0未禁用 1禁用
  if(updateForm.stateStr === '未禁用'){
    updateForm.stateBo = true
    updateForm.state = 0
  }
  if(updateForm.stateStr === '禁用'){
    updateForm.stateBo = false
    updateForm.state = 1
  }
}
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户名不能为空'))
  }else {
    callback()
  }
}
const validateSex = (rule: any, value: any, callback: any) => {
  //处理提交的表单数据
  implementDataInsert()
  if (insertForm.sex === -1) {
    callback(new Error('请选择性别'))
  }else {
    callback()
  }
}
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('联系方式不能为空'))
  }else {
    callback()
  }
}
const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请填写真实姓名'))
  }else {
    callback()
  }
}
const validateIdCard = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请填写身份证'))
  }else {
    callback()
  }
}
//校验规则
const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  sex: [{ validator: validateSex, trigger: 'change' }],
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  name: [{ validator: validateName, trigger: 'blur' }],
  idCard: [{ validator: validateIdCard, trigger: 'blur' }],
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
  id: '',
  username: '',
  // avatar: '',
  // age: '',
  sex: -1,
  sexStr: '男',
  phone: '',
  name: '',
  idCard: '',
  state: 0,
  stateStr: '',
  stateBo: true
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
//选择的角色名称
const checkedRoles = ref<any>([])
//选择的角色id
const checkedRolesId = ref<any>([])
//所有的角色
const roles = [
  {
    id: '1',
    name: '系统管理员'
  },
  {
    id: '2',
    name: '资源管理员'
  },
]
//请求获取的数据
const requestData = ref<any>([])
//添加角色
const dialogFormVisibleRole = ref(false)
//获取用户选择的角色
const getCheckedRole = () => {
  checkedRoles.value.forEach((item: any) => {
    //  遍历所有数据 获取匹配的角色id
    roles.forEach((role: any) => {
      if(role.name === item){
        checkedRolesId.value.push(role.id)
      }
    })
  })
}
//表单提交
const onSubmitRole = () => {
//  角色授权
  console.log('checkedRoles ',checkedRoles.value)
  getCheckedRole()
  console.log('checkedRolesId ',checkedRolesId.value)


}
//请求所有角色
const getRequestData = () => {
//  请求数据
//   requestData.value =

}
//请求该用户的所有角色
const getRoleData = (userId: any) => {
//  请求数据

  //选中获取的数据
  // data.forEach((item: any) => {
  //   checkedRoles.value = item.name
  // })
}


</script>

<template>
  <div>
    <div>
      <el-button type="primary" @click="dialogFormVisibleInsert=true">添加</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="avatar" label="头像" width="180" align="center">
        <template #default="{ row }">
          <el-image style="width: 100px; height: 100px" :src="row.avatar" fit="cover"/>
<!--          开启预览-->
<!--          <el-image-->
<!--              style="width: 100px; height: 100px"-->
<!--              :src="row.avatar"-->
<!--              :preview-src-list="[row.avatar]"-->
<!--              fit="cover"-->
<!--          />-->
        </template>
      </el-table-column>>
      <el-table-column prop="age" label="年龄" width="180" />
      <el-table-column prop="sex" label="性别" width="180" />
      <el-table-column prop="phone" label="电话" width="180" />
      <el-table-column prop="name" label="真实姓名" width="180" />
      <el-table-column prop="idCard" label="身份证" width="180" />
      <el-table-column prop="state" label="状态" width="180" >
        <template #default="scope">
          <el-tag :type="scope.row.stateStr === '禁用' ? 'danger' : 'success'" disable-transitions>
            {{ scope.row.stateStr }}
          </el-tag>
        </template>
      </el-table-column>>
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleDelClick(scope.row)">删除</el-button>
          <el-button link type="primary" size="small" @click="handleUpdateClick(dialogFormVisibleUpdate=true,scope.row)">修改</el-button>
          <el-button link type="primary" size="small" @click="handleRoleClick(dialogFormVisibleRole=true,scope.row)">角色查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    dialog添加表单-->
    <el-dialog v-model="dialogFormVisibleInsert" title="添加">
      <el-form :model="insertForm" ref="insertFormInstance" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="insertForm.username" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
<!--          <el-input v-model="insertForm.sex" autocomplete="off"/>-->
          <el-radio-group v-model="insertForm.sexStr">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="insertForm.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="insertForm.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="身份证" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="insertForm.idCard" autocomplete="off"/>
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
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="updateForm.username" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <!--          <el-input v-model="insertForm.sex" autocomplete="off"/>-->
          <el-radio-group v-model="updateForm.sexStr">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="updateForm.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="updateForm.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="身份证" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="updateForm.idCard" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
              v-model="updateForm.stateBo"
              class="ml-2"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitUpdate(updateFormInstance)">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    dialog添加角色-->
    <el-dialog v-model="dialogFormVisibleRole" title="添加">
      <el-checkbox-group v-model="checkedRoles">
        <el-checkbox v-for="o in roles" :key="o.id" :label="o.name">
          {{o.name}}
        </el-checkbox>
      </el-checkbox-group>
      <el-button type="primary" @click="onSubmitRole(dialogFormVisibleRole = false)">提交</el-button>
    </el-dialog>

  </div>
</template>


<style scoped lang="scss">

</style>
