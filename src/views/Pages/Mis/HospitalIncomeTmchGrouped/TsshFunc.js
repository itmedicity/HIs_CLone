import { axiosinstance } from "../../../../controllers/AxiosConfig";

export const creditInsuranceBillDetlPart1 = async (state) => {
    return await axiosinstance.post('/collectionDetlPartTssh/creditInsuranceBillDetlPart1', state).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const creditInsuranceBillDetlPart2 = async (state) => {
    return await axiosinstance.post('/collectionDetlPartTssh/creditInsuranceBillDetlPart2', state).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const creditInsuranceBillDetlPart3 = async (state) => {
    return await axiosinstance.post('/collectionDetlPartTssh/creditInsuranceBillDetlPart3', state).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const creditInsuranceBillDetlPart4 = async (state) => {
    return await axiosinstance.post('/collectionDetlPartTssh/creditInsuranceBillDetlPart4', state).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const creditInsuranceBillDetlPart5 = async (state) => {
    return await axiosinstance.post('/collectionDetlPartTssh/creditInsuranceBillDetlPart5', state).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const creditInsuranceBillDetlPart6 = async (state) => {
    return await axiosinstance.post('/collectionDetlPartTssh/creditInsuranceBillDetlPart6', state).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const getUnsettledBillDetl = async (state) => {
    return await axiosinstance.post('/collectionDetlPartTssh/unSettledAmountDetl', state).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const advanceCollectionDetail = async (state) => {
    return await axiosinstance.post('/collectionDetlPartTssh/advanceCollection', state).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

// CREIT INSURANCE BILL COLLECTION DETAILS API

export const credInsuranceCollectionModalData1 = async (state) => {
    return await axiosinstance.post('/collectionDetlPartTssh/creditInsuranceBillCollection1', state).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const credInsuranceCollectionModalData2 = async (state) => {
    return await axiosinstance.post('/collectionDetlPartTssh/creditInsuranceBillCollection2', state).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}