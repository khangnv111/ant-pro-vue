<template>
  <div style="background:#fff; padding:30px 4px 10px 4px">
    <div class="table-operator">
      <a-table
        ref="table"
        :columns="columns"
        :dataSource="data"
        bordered
        :pagination="ipagination"
        @change="handleTableChange"
        rowKey="gifCode"
        :loading="loading"
      >
        <span slot="stt" slot-scope="text, record, index">
          {{ index + 1 + (ipagination.current - 1) * ipagination.pageSize }}
        </span>
        <span slot="value" slot-scope="text, record">
          {{record.value | NumberFormat}}
        </span>
        <span slot="isUsed" slot-scope="text, record">
          <a-tag
            :color="record.isUsed === true ? 'red' : 'green'"
            :key="record.isUsed"
          >
            {{ record.isUsed===true ? 'Đã sử dụng' : 'Chưa sử dụng' }}
          </a-tag>
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import { getGiftCodeDetail } from '@/api/giftcode'
export default {
  name: 'GiftCodeDetail',
  components: { },
  data () {
    return {
      data: [],
      columns: [
        {
          title: 'STT',
          scopedSlots: { customRender: 'stt' }
        },
        {
          title: 'Mã GiftCode',
          dataIndex: 'gifCode',
          key: 'gifCode'
        },
        {
          title: 'Giá trị',
          dataIndex: 'value',
          key: 'value',
          scopedSlots: { customRender: 'value' }
        },
        {
          title: 'Trạng thái',
          dataIndex: 'isUsed',
          scopedSlots: { customRender: 'isUsed' }
        },
        {
          title: 'Thời gian sử dụng',
          dataIndex: 'usedTime'
        },
        {
          title: 'Thời gian tạo',
          dataIndex: 'createTime'
        },
        {
          title: 'Thời gian kết thúc',
          dataIndex: 'endTime'
        },
        {
          title: 'AccountID',
          dataIndex: 'accountID'
        },
        {
          title: 'AccountName',
          dataIndex: 'accountName'
        },
        {
          title: 'NickName',
          dataIndex: 'nickName'
        }
      ],
      loading: false,
      queryParam: {},
      selectedRowKeys: [], // Check here to configure the default column
      ipagination: {
        current: 1,
        pageSize: 50,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' / ' + total
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      }
    }
  },
  methods: {
    init () {
      console.log('call init')
      const id = this.$route.params && this.$route.params.gifCodeID
      console.log('id: ', id)
      this.queryParam.GiftCodeId = id
      this.Search()
    },
    Search () {
      this.loading = true
      this.queryParam.Page = this.ipagination.current
      this.queryParam.Size = this.ipagination.pageSize
      return getGiftCodeDetail(Object.assign(this.queryParam))
        .then(res => {
          console.log('Search res: ', res)
          this.data = res.data
          this.ipagination.total = res.code
          this.loading = false
        })
    },
    // -------------------
    onChangeDate (date, dateString) {
      console.log('dateString: ', dateString)
      this.queryParam.fromDate = dateString[0]
      this.queryParam.toDate = dateString[1]
    },
    // -------------------
    handleTableChange (pagination, filters, sorter) {
      console.log('page: ', pagination)
      // if (Object.keys(sorter).length > 0) {
      //   this.isorter.column = sorter.field
      //   this.isorter.order = sorter.order === 'ascend' ? 'asc' : 'desc'
      // }
      this.ipagination = pagination
      this.Search()
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleUpdate (item) {
      console.log('item: ', item)
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
