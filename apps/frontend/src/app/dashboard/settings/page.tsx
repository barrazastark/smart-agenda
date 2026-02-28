'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSettings, updateSettings } from '@/lib/api'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Loader2, Settings, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const settingsFormSchema = z.object({
  pageTitle: z.string().min(2, {
    message: 'El título debe tener al menos 2 caracteres.',
  }),
})

type SettingsFormValues = z.infer<typeof settingsFormSchema>

export default function SettingsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const hasFetched = useRef(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      pageTitle: '',
    },
  })

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    async function loadSettings() {
      try {
        const { data } = await getSettings()
        form.reset({ pageTitle: data.pageTitle || '' })
      } catch {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudieron cargar los ajustes.',
        })
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [form, toast])

  const onSubmit = useCallback(
    async (values: SettingsFormValues) => {
      setSaving(true)
      try {
        await updateSettings(values)
        toast({
          title: '¡Ajustes guardados!',
          description: 'Se ha actualizado el título de la aplicación correctamente.',
        })
        router.refresh()
      } catch {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudieron guardar los cambios.',
        })
      } finally {
        setSaving(false)
      }
    },
    [toast, router]
  )

  if (loading) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center gap-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="absolute inset-0 h-12 w-12 blur-xl bg-primary/20 animate-pulse" />
        </div>
        <p className="text-zinc-500 animate-pulse font-medium">Cargando configuración...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Settings className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Configuración
          </h1>
        </div>
        <p className="text-zinc-400 text-lg">
          Administra las preferencias generales de tu sistema.
        </p>
      </div>

      <Card className="border border-zinc-800 bg-[#09090b]/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <Sparkles className="h-24 w-24 text-primary" />
        </div>

        <CardHeader className="border-b border-zinc-900 pb-8">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Identidad del Sistema
          </CardTitle>
          <CardDescription className="text-zinc-500 text-base">
            Define cómo se presenta tu aplicación a los usuarios.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="pageTitle"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-base font-semibold text-zinc-200">
                      Título de la Aplicación
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Input
                          data-testid="page-title-input"
                          placeholder="SmartAgenda"
                          {...field}
                          className="h-14 text-lg bg-zinc-950/50 border-zinc-800 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 pr-12"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription className="text-zinc-500">
                      Este nombre se mostrará en la navegación, títulos de pestaña y correos.
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button
                  data-testid="save-settings-btn"
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(var(--primary),0.15)] hover:shadow-[0_0_25px_rgba(var(--primary),0.25)] transition-all duration-300 transform active:scale-[0.98]"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      <span>Sincronizando...</span>
                    </>
                  ) : (
                    'Guardar Ajustes'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8 p-4 rounded-lg bg-zinc-900/30 border border-zinc-800/50 text-center">
        <p className="text-sm text-zinc-500">
          Los cambios se aplicarán de forma inmediata en todos los módulos conectados.
        </p>
      </div>
    </div>
  )
}
