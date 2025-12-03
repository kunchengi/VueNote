// 首页相关接口的数据类型定义

// 响应数据的通用类型
export interface ResponseData {
  code: number;
  message: string;
  success: boolean;
}

// 医院数据的类型定义
export interface Hospital {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        hostypeString: string,
        fullAddress: string
    },
    hoscode: string,
    hosname: string,
    hostype: string,
    provinceCode: string,
    cityCode: string,
    districtCode: string,
    address: string,
    logoData: string,
    bookingRule: {
        cycle: number,
        releaseTime: string,
        stopTime: string,
        quitDay: number,
        quitTime: string,
        rule: string[]
    },
    intro: string,
    route: string,
    status: number
}

// 存储全部已有医院数据的数组类型
export type Content = Hospital[];

// 医院接口返回的响应数据类型
export interface HospitalResponseData extends ResponseData {
    data: {
        content: Content,
        pageable: {
            sort: {
                sorted: boolean,
                unsorted: boolean,
                empty: boolean
            },
            offset: number,
            pageSize: number,
            pageNumber: number,
            paged: boolean,
            unpaged: boolean
        },
        totalPages: number,
        totalElements: number,
        first: boolean,
        last: boolean,
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        numberOfElements: number,
        size: number,
        number: number,
        empty: boolean
    }
}