<template>
  <div>
    <a-modal
      title="Thêm mới GiftCode"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
      width="1000px"
    >
      <a-alert v-if="isError" :type="typeAlert" showIcon style="margin-bottom: 24px;" :message="messageError" />
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="Tên chiến dịch">
          <a-select v-model="data.EventID">
            <tag-select-option :key="0" :value="0">Chọn chiến dịch</tag-select-option>
            <a-select-option v-for="item in ListEvent" :key="item.eventID" :value="item.eventID">
              {{item.eventName}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Tên GiftCode">
          <a-input v-model="data.GiftCodeName"/>
        </a-form-item>
        <a-form-item label="Mệnh giá">
          <a-input type="number" :min="0" v-model="data.Value"/>
        </a-form-item>
        <a-form-item label="Số lượng">
          <a-input type="number" :min="0" v-model="data.Quantity"/>
        </a-form-item>
        <a-form-item label="Số lần nhập">
          <a-input type="number" :min="0" v-model="data.NumberInput"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getListEventGiftCode, CreateGiftCode } from '@/api/giftcode'
import TagSelectOption from '../../components/TagSelect/TagSelectOption'

export default {
  name: 'GiftCodeInsert',
  components: { TagSelectOption },
  data () {
    return {
      data: {
        EventID: 0
      },
      visible: false,
      confirmLoading: false,
      ListEvent: [],
      isError: false,
      messageError: '',
      typeAlert: 'error'
    }
  },
  methods: {
    getListEvent () {
      return getListEventGiftCode()
        .then(res => {
          // console.log('Search res: ', res)
          this.ListEvent = res.data
        })
    },
    showModal () {
      this.isError = false
      this.data = {}
      this.data.EventID = 0
      this.visible = true
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    handleSubmit () {
      console.log('data: ', this.data)
      this.confirmLoading = true
      return CreateGiftCode(Object.assign(this.data))
        .then(res => {
          console.log('CreateGiftCode res: ', res)
          this.confirmLoading = false
          if (res.code < 0) {
            this.isError = true
            this.typeAlert = 'error'
            this.messageError = res.description
          } else {
            this.isError = true
            this.typeAlert = 'success'
            this.messageError = 'Thành công'
            setTimeout(() => {
              this.visible = false
              this.$emit('onModalOk')
            }, 1000)
          }
        })
    }
  }
}
</script>
