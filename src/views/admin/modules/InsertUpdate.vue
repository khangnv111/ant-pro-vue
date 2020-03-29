<template>
  <div>
    <a-modal
      title="Title"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <p>{{ModalText}}</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'InsertUpdate',
  data () {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    handleSubmit () {
      console.log('Clicked ok button')
      this.visible = false
    }
  }
}
</script>
