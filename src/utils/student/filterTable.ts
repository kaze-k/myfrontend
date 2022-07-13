import { computed } from 'vue'

const filterTable = (tableData: any, value: any, search: any) =>
  computed(() => tableData.value.filter(
    (data: any) => {
      switch (value.value.value) {
        case 'num':
          return !search.value ||
            data.num.toString().includes(search.value)
        case 'class':
          return !search.value ||
            data.class.toLowerCase().includes(search.value.toLowerCase())
        case 'Sname':
          return !search.value ||
            data.Sname.toLowerCase().includes(search.value.toLowerCase())
        case 'sex':
          return !search.value ||
            data.sex.toLowerCase().includes(search.value.toLowerCase())
        case 'age':
          return !search.value ||
            data.age.toString().includes(search.value)
        case 'address':
          return !search.value ||
            data.address.toLowerCase().includes(search.value.toLowerCase())
        case 'phone':
          return !search.value ||
            data.phone.toString().includes(search.value)
        default:
          return !search.value ||
            data.num.toString().includes(search.value) ||
            data.class.toLowerCase().includes(search.value.toLowerCase()) ||
            data.Sname.toLowerCase().includes(search.value.toLowerCase()) ||
            data.sex.toLowerCase().includes(search.value.toLowerCase()) ||
            data.age.toString().includes(search.value) ||
            data.address.toLowerCase().includes(search.value.toLowerCase()) ||
            data.phone.toString().includes(search.value)
      }
    }
  ))

export default filterTable
