import { axios } from '@/utils/request'

export async function getListGiftCode (parameter) {
  console.log('getListGiftCode: ', parameter)
  try {
    const giftCodeName = parameter.GiftCodeName ? parameter.GiftCodeName : ''
    const giftCodeValue = parameter.giftCodeValue ? parameter.giftCodeValue : 0
    const status = parameter.status !== undefined ? parameter.status : -1
    const fromDate = parameter.fromDate ? parameter.fromDate : ''
    const toDate = parameter.toDate ? parameter.toDate : ''
    const list = await axios.get(`/api/giftcode/get-list?giftCodeName=${giftCodeName}&giftCodeValue=${giftCodeValue}&status=${status}&fromDate=${fromDate}&toDate=${toDate}`)
    // console.log('list: ', list)
    return list.data
  } catch (e) {
    console.log(e)
  }
}

export async function getGiftCodeDetail (parameter) {
  console.log('getGiftCodeDetail: ', parameter)
  try {
    const GiftCodeId = parameter.GiftCodeId ? parameter.GiftCodeId : 0
    const IsUsed = parameter.IsUsed !== undefined ? parameter.IsUsed : -1
    const Page = parameter.Page ? parameter.Page : 1
    const Size = parameter.Size ? parameter.Size : 50

    const list = await axios.get(`/api/giftcode/get-detail?GiftCodeId=${GiftCodeId}&IsUsed=${IsUsed}&Page=${Page}&Size=${Size}`)
    // console.log('list: ', list)
    return list
  } catch (e) {
    console.log(e)
  }
}

export async function getListEventGiftCode () {
  try {
    const list = await axios.get(`/api/giftcode/get-list-event`)
    // console.log('list: ', list)
    return list
  } catch (e) {
    console.log(e)
  }
}

export async function CreateGiftCode (parameter) {
  try {
    console.log('CreateGiftCode: ', parameter)
    const param = `EventID=${parameter.EventID}&GiftCodeName=${parameter.GiftCodeName}&GiftcodeValue=${parameter.Value}&Quantity=${parameter.Quantity}&NumberInput=${parameter.NumberInput}`
    const response = await axios.post(`/api/giftcode/insert?${param}`)
    // console.log('list: ', list)
    return response
  } catch (e) {
    console.log(e)
  }
}
