import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import { FormInput, FormSelect } from '@/components/Form'
import { DesignColor, orderStatusOptions } from '@/constants'
import { OrderData, PatchOrderArgs } from '@/interfaces'
import { useGetComponentsQuery } from '@/services/component'
import { showModal } from '@/services/modal'
import { useGetModelsQuery } from '@/services/model'
import { useDeleteOrderMutation, useUpdateOrderMutation } from '@/services/order'
import { useGetServicesQuery } from '@/services/service'
import { useAppDispatch } from '@/store'
import { idToString } from '@/utils/idToString'
import { modelIdConverter } from '@/utils/stringConverter'
import { useOptions } from '@/utils/useOptions'
import { useUpdate } from '@/utils/useUpdate'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { memo, useMemo } from 'react'
import * as Yup from 'yup'

const OrderForm = ({ order: orderObj }: { order: OrderData }) => {
    const {
        service: { modelId, componentId, qualityId },
        serviceId,
        created,
        ...order
    } = orderObj

    const dispatch = useAppDispatch()

    const router = useRouter()

    const initialValues: Omit<PatchOrderArgs, 'status'> = {
        ...order,
        modelId,
        componentId,
        qualityId,
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, ({ min }) => `Min ${min} letters`)
            .max(32, ({ max }) => `Max ${max} letters`)
            .required('Required'),
        surname: Yup.string()
            .min(3, ({ min }) => `Min ${min} letters`)
            .max(32, ({ max }) => `Max ${max} letters`)
            .required('Required'),
        tel: Yup.string()
            .matches(/[+]{1}38[0]{1}[0-9]{9}/, 'Incorrect format')
            .required('Required'),
        email: Yup.string()
            .matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Incorrect format')
            .required('Required'),
        modelId: Yup.string().required('Required'),
        componentId: Yup.string().required('Required'),
        qualityId: Yup.string().required('Required'),
        cost: Yup.number().min(0, "Can't be less 0"),
    })

    const formik = useFormik<Omit<PatchOrderArgs, 'status'>>({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: () => {},
    })

    const { values } = formik

    // Retrieving needed data
    const { data: models } = useGetModelsQuery()
    const { data: components } = useGetComponentsQuery(values.modelId)
    const { data: services } = useGetServicesQuery({
        modelId: values.modelId,
        componentId: values.componentId,
    })

    // Preparing arrays of objects for select options
    const modelOptions = useOptions(models, modelIdConverter)
    const componentOptions = useOptions(components)
    const qualities = useMemo(() => services?.map(service => service.qualityId), [services])
    const qualityOptions = useOptions(qualities)

    const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation()
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation()

    // Catching changes of model
    useUpdate(() => {
        formik.setFieldValue('componentId', '')
    }, [values.modelId])

    // Catching changes of component
    useUpdate(() => {
        formik.setFieldValue('qualityId', '')
    }, [values.componentId])

    // Catching changes of quality
    useUpdate(() => {
        formik.setFieldValue('cost', services?.find(service => service.qualityId === values.qualityId)?.cost || 0)
    }, [values.qualityId])

    return (
        <FormikProvider value={formik}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start gap-3">
                    <h5 className="text-h5 font-semibold">Base info</h5>
                    <FormInput placeholder="John" id="name" label="Name" name="name" type="text" />
                    <FormInput placeholder="Doe" id="surname" label="Surname" name="surname" type="text" />
                    <FormInput placeholder="+38" id="tel" label="Tel" name="tel" type="text" />
                    <FormInput placeholder="example@example.com" id="email" label="Email" name="email" type="email" />
                </Card>

                <Card className="flex flex-col items-start gap-3">
                    <h5 className="text-h5 font-semibold">Service info</h5>
                    <FormSelect
                        name="modelId"
                        id="model"
                        label="Model"
                        placeholder="Choose model"
                        options={modelOptions}
                    />
                    <FormSelect
                        name="componentId"
                        id="component"
                        label="Component"
                        placeholder="Choose component"
                        options={componentOptions}
                    />
                    <FormSelect
                        name="qualityId"
                        id="quality"
                        label="Quality"
                        placeholder="Choose quality"
                        options={qualityOptions}
                    />
                    <FormInput name="cost" id="cost" label="Cost (UAH)" type="text" />
                </Card>

                <Card className="flex flex-col gap-3">
                    <h5 className="text-h5 font-semibold">Status</h5>
                    {order.operations.length > 0 ? (
                        order.operations.map(op => (
                            <div key={op.id}>
                                <p>
                                    {op.status} by {op.employee.login}
                                </p>
                                <p>{new Date(op.dateTime).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <span>No operations – Just created</span>
                    )}
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] items-start gap-2">
                        {orderStatusOptions.map(status => (
                            <Button
                                key={status.value}
                                onClick={() =>
                                    updateOrder({ id: order.id, status: status.value })
                                        .unwrap()
                                        .then(() => {
                                            dispatch(
                                                showModal({
                                                    title: 'Success',
                                                    description: `Successfully set status '${
                                                        status.title
                                                    }' for Order #${idToString(order.id)}`,
                                                }),
                                            )
                                        })
                                }
                                color={DesignColor.Violet}
                                isLoading={isUpdating}
                                disabled={!!order.operations.find(operation => operation.status == status.value)}
                            >
                                {status.title}
                            </Button>
                        ))}
                    </div>
                    <h5 className="mt-auto text-h5 font-semibold">Actions</h5>
                    <div className="mb-0 grid grid-cols-3 items-start gap-2">
                        <Button onClick={() => router.push('/orders')} color={DesignColor.Violet}>
                            Close
                        </Button>
                        <Button
                            onClick={() =>
                                deleteOrder(order.id)
                                    .unwrap()
                                    .then(() => router.push('/orders'))
                            }
                            color={DesignColor.Red}
                            isLoading={isDeleting}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() =>
                                updateOrder(values)
                                    .unwrap()
                                    .then(() => {
                                        dispatch(
                                            showModal({
                                                title: 'Success',
                                                description: `Order #${idToString(order.id)} successfully updated`,
                                            }),
                                        )
                                    })
                            }
                            disabled={values === formik.initialValues}
                            isLoading={isUpdating}
                            color={DesignColor.Green}
                        >
                            Save
                        </Button>
                    </div>
                </Card>
            </div>
        </FormikProvider>
    )
}

export default memo(OrderForm)
