export type IService = {
    id: number
    modelId: string
    componentId: string
    qualityId: string
    cost: number
}

export type IServiceGetMany = {
    modelId?: string
    componentId?: string
    qualityId?: string
}
