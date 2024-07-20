import { createSlice } from "@reduxjs/toolkit";

const FromSlice = createSlice({
    name: 'form',
    initialState: {
        comp: 'name',
        name: '',
        phone: '',
        dob: '',
        city: '',
        sign: '',
        bill_no: '',
        comp2: 'operator',
        service: '',
        service_value: '',
        socks: '',
        socks_value: '',
        payment: '',
        mixed_online: '',
        mixed_cash: '',
        discount: '',
        amount: '',
        operator: '',
        status: 'pending',
        reject_reason: '',
    },
    reducers: {
        addComp(state, action) {
            state.comp = action.payload
        },
        addName(state, action) {
            state.name = action.payload
        },
        addPhone(state, action) {
            state.phone = action.payload
        },
        addDob(state, action) {
            state.dob = action.payload
        },
        addCity(state, action) {
            state.city = action.payload
        },
        addSign(state, action) {
            state.sign = action.payload
        },
        addBillNo(state, action) {
            state.bill_no = action.payload
        },
        addComp2(state, action) {
            state.comp2 = action.payload
        },
        addService(state, action) {
            state.service = action.payload
        },
        addSocks(state, action) {
            state.socks = action.payload
        },
        addPayment(state, action) {
            state.payment = action.payload
        },
        addMixedOnline(state, action) {
            state.mixed_online = action.payload
        },
        addMixedCash(state, action) {
            state.mixed_cash = action.payload
        },
        addDiscount(state, action) {
            state.discount = action.payload
        },
        addAmount(state, action) {
            state.amount = action.payload
        },
        addOperator(state, action) {
            state.operator = action.payload
        },
        addServiceValue(state, action) {
            state.service_value = action.payload
        },
        addSocksValue(state, action) {
            state.socks_value = action.payload
        },
        addRejectedReason(state, action) {
            state.reject_reason = action.payload
        },
        addStatus(state, action) {
            state.status = action.payload
        },



        clearForm(state) {
            state.comp = 'name'
            state.name = ''
            state.phone = ''
            state.dob = ''
            state.city = ''
            state.sign = ''
            state.bill_no = ''
            state.comp2 = 'operator'
            state.service = ''
            state.socks = ''
            state.payment = ''
            state.discount = ''
            state.amount = ''
            state.operator = ''
            state.service_value = ''
            state.socks_value = ''
            state.mixed_cash = ''
            state.mixed_online = ''
            state.status = 'pending'
            state.reject_reason = ''
        }
    }
})

export const { addStatus, addRejectedReason, addComp, addName, addPhone, addDob, addCity, addSign, addBillNo, clearForm, addComp2, addService, addSocks, addPayment, addDiscount, addAmount, addOperator, addServiceValue, addSocksValue, addMixedCash, addMixedOnline } = FromSlice.actions
export default FromSlice.reducer