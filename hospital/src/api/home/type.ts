// 首页相关接口的数据类型定义
import { type ResponseData, type Hospital } from '@/api/base/type';

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

// 目录数据类型
export interface DictData {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
    },
    parentId: number,
    name: string,
    value: string,
    dictCode: string,
    hasChildren: boolean,
}

export type DictDataList = DictData[];

// 目录数据响应数据类型
export interface DictResponseData extends ResponseData {
    data: DictDataList;
}

// 根据医院名称模糊查询医院列表响应数据类型
export interface FindHospitalResponseData extends ResponseData {
    data: Content;
}
