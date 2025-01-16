/* eslint-disable @typescript-eslint/no-explicit-any */
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TextInput from '@/Components/TextInput'
import SecondaryButton from '@/Components/SecondaryButton'
import TertiaryButton from '@/Components/TertiaryButton'
import { Link, router, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { notyf } from '@/libs/notyf'
import axios from 'axios'
import { Inertia } from '@inertiajs/inertia'
import { SubscriberProps } from '@/types/subscriber'
import Form from '@/Layouts/FormLayout'

type Props = {
  subscriber: SubscriberProps
}

type FormErrors = {
  name?: string
  email?: string
  email_list_id?: string
}

export default function Index({ subscriber }: Props) {
  const [errors, setErrors] = useState<FormErrors>({})

  const [processing, setProcessing] = useState(false)

  const { data, setData } = useForm({
    name: subscriber.name,
    email: subscriber.email,
  })

  const submit: FormEventHandler = async (e) => {
    e.preventDefault()

    setProcessing(true)

    setErrors({})

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('email_list_id', subscriber.email_list_id.toString())
    formData.append('_method', 'PUT')

    try {
      const response = await axios.post(
        route('subscribers.update', {
          list: subscriber.email_list_id,
          subscriber: subscriber.id,
        }),
        formData,
      )

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message)
          setTimeout(resolve, 2000)
        })
      }

      Inertia.visit(route('lists.show', { list: subscriber.email_list_id }))
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        notyf?.error(error.response?.data?.message || 'An error occurred.')
      }
    } finally {
      setProcessing(false)
    }
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Subscriber - Edit
        </h2>
      }
    >
      <div className="flex flex-col pb-12 mt-10 lg:pb-0 lg:mt-0">
        <Link
          href={route('lists.index')}
          className="mb-2 ml-1 text-xs text-gray-400 w-[11rem]"
        >
          {`Lists > `}
          <Link
            href={route('lists.show', {
              list: subscriber.email_list_id,
            })}
            className="text-gray-400"
          >
            {`Show > `}
          </Link>
          <Link
            href={route('subscribers.edit', {
              list: subscriber.email_list_id,
              subscriber: subscriber.id,
            })}
            className="text-gray-200"
          >
            Edit Subscriber
          </Link>
        </Link>
        <Form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="name" value="Name" />

            <TextInput
              id="name"
              name="name"
              className="block w-full mt-1"
              placeholder="Subscriber's name"
              value={data.name}
              disabled={processing}
              onChange={(e) => setData('name', e.target.value)}
              isFocused
              autoComplete="name"
            />

            <InputError className="mt-2" message={errors.name} />
          </div>

          <div>
            <InputLabel htmlFor="email" value="Email" />

            <TextInput
              id="email"
              name="email"
              className="block w-full mt-1"
              placeholder="subscriber@email.com"
              value={data.email}
              disabled={processing}
              onChange={(e) => setData('email', e.target.value)}
              isFocused
              autoComplete="email"
            />

            <InputError className="mt-2" message={errors.email} />
          </div>

          <div className="flex items-center justify-end gap-4">
            <SecondaryButton
              onClick={() =>
                router.get(
                  route('lists.show', {
                    list: subscriber.email_list_id,
                  }),
                )
              }
              disabled={processing}
            >
              Go back
            </SecondaryButton>
            <TertiaryButton disabled={processing}>Save List</TertiaryButton>
          </div>
        </Form>
      </div>
    </AuthenticatedLayout>
  )
}
