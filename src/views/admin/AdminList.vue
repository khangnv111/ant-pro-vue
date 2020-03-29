<template>
  <div style="background:#fff; padding:30px 4px 10px 4px">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="UserName">
              <a-input v-model="queryParam.UserName" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="Trạng thái">
              <a-select v-model="queryParam.status" placeholder="Chọn trạng thái">
                <a-select-option :value="-1">Tất cả</a-select-option>
                <a-select-option :value="1">Hoạt động</a-select-option>
                <a-select-option :value="0">Ngừng hoạt động</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" @click="Search">
              Search
            </a-button>
            <a-button @click="$refs.createUpdateModal.showModal()" style="margin-left: 8px">
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        bordered
        :pagination="{ pageSize: 20 }"
        @change="handleTableChange"
        rowKey="userName"
      >
        <span slot="stt" slot-scope="text, record, index">
          {{ index + 1 }}
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
          <a href="javascript:;" @click="handleUpdate(record)">Edit</a>
          <a-divider type="vertical"/>
          <a href="javascript:;">Delete</a>
        </span>
      </a-table>
    </div>
    <insert-update ref="createUpdateModal" @ok="handleOk"></insert-update>
  </div>
</template>

<script>
import { getListAdmin } from '@/api/manage'
import InsertUpdate from './modules/InsertUpdate'

export default {
  name: 'AdminList',
  components: { InsertUpdate },
  data () {
    return {
      data: [],
      columns: [
        {
          title: 'STT',
          scopedSlots: { customRender: 'stt' }
        },
        {
          title: 'UserName',
          dataIndex: 'userName',
          key: 'userName'
        },
        {
          title: 'Trạng thái',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: 'Thời gian tạo',
          dataIndex: 'createDate'
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
        pageSize: 20,
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
      return getListAdmin(Object.assign(this.queryParam))
        .then(res => {
          // console.log('Search res: ', res)
          this.data = res
          // return res
        })
    },
    handleTableChange (pagination, filters, sorter) {
      console.log('page: ', pagination)
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
    }
  },
  mounted () {
    this.init()
  }
}
</script>
