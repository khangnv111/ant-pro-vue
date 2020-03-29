<template>
  <div style="background:#fff; padding:30px 4px 10px 4px">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="Tên gói">
              <a-input v-model="queryParam.GiftCodeName" placeholder="Nhập tên gói giftcode"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="Trạng thái">
              <a-select v-model="queryParam.status" placeholder="Chọn trạng thái">
                <a-select-option :value="-1">Tất cả</a-select-option>
                <a-select-option :value="1">Hoạt động</a-select-option>
                <a-select-option :value="0">Ngừng hoạt động</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="24">
            <a-form-item label="Thời gian">
              <a-range-picker @change="onChangeDate"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" @click="Search">
              Search
            </a-button>
            <a-button @click="OpenInsert" style="margin-left: 8px">
              Thêm mới
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-table
        ref="table"
        :columns="columns"
        :dataSource="data"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        bordered
        :pagination="{pageSize: ipagination.pageSize}"
        @change="handleTableChange"
        rowKey="gifCodeID"
      >
        <span slot="stt" slot-scope="text, record, index">
          {{ index + 1 + (ipagination.current - 1) * ipagination.pageSize }}
        </span>
        <span slot="gifCodeValue" slot-scope="text, record">
          {{record.gifCodeValue | NumberFormat}}
        </span>
        <span slot="status" slot-scope="text, record">
          <a-tag
            :color="record.status === 1 ? 'green' : 'red'"
            :key="record.status"
          >
            {{ record.status===1 ? 'Hoạt động' : 'Ngừng hoạt động' }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="record">
          <router-link :to="{name: 'GiftCodeDetail', params: {gifCodeID: record.gifCodeID}}">Chi tiết</router-link>
        </span>
      </a-table>
    </div>
    <gift-code-insert ref="InsertGiftCodeModal" @onModalOk="Search"></gift-code-insert>
  </div>
</template>

<script>
import { getListGiftCode } from '@/api/giftcode'
import GiftCodeInsert from './GiftCodeInsert'

export default {
  name: 'GiftCodeList',
  components: { GiftCodeInsert },
  data () {
    return {
      data: [],
      columns: [
        {
          title: 'STT',
          scopedSlots: { customRender: 'stt' }
        },
        {
          title: 'Gói GiftCode',
          dataIndex: 'gifCodeName',
          key: 'gifCodeName'
        },
        {
          title: 'Giá trị',
          dataIndex: 'gifCodeValue',
          key: 'gifCodeValue',
          scopedSlots: { customRender: 'gifCodeValue' }
        },
        {
          title: 'Trạng thái',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: 'Thời gian tạo',
          dataIndex: 'createTime'
        },
        {
          title: 'Thời gian bắt đầu',
          dataIndex: 'startDate'
        },
        {
          title: 'Thời gian kết thúc',
          dataIndex: 'endDate'
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
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
      this.Search()
    },
    Search () {
      this.loading = true
      return getListGiftCode(Object.assign(this.queryParam))
        .then(res => {
          // console.log('Search res: ', res)
          this.data = res
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
      this.ipagination.current = pagination.current
      // if (Object.keys(sorter).length > 0) {
      //   this.isorter.column = sorter.field
      //   this.isorter.order = sorter.order === 'ascend' ? 'asc' : 'desc'
      // }
      // this.ipagination = pagination
      // this.loadData()
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
    },
    // ----------------
    OpenInsert () {
      this.$refs.InsertGiftCodeModal.showModal()
      this.$refs.InsertGiftCodeModal.getListEvent()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
