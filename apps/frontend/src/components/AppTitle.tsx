import { AppTitleServer } from './AppTitleServer'

export function AppTitle() {
  return <AppTitleServer />
}

// Para testing: exportamos el componente sin lógica async
export function AppTitleMock() {
  return <h1 className="text-3xl font-bold">SmartAgenda</h1>
}
