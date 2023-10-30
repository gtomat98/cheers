import axios from 'axios'
const api = axios.create({
  baseURL: 'https://cheers-seven.vercel.app/api',
})

type FetchProps = (
  url: string,
  method: 'post' | 'get' | 'put' | 'delete',
  data?: any,
) => Promise<void>

export async function executeTask() {
  const FetchApi: FetchProps = async (url, method, data) => {
    try {
      await api[method](`${url}`, {
        data,
      })
    } catch (error) {
      console.error('Erro ao executar a tarefa:', error)
      setTimeout(() => FetchApi(url, method), 30 * 60 * 1000)
    }
  }

  const currentDate = new Date()
  const dayOfWeek = currentDate.getDay()
  const isStartOfWeek = dayOfWeek === 0

  if (isStartOfWeek) {
    FetchApi('/server/insertNewMeals', 'put')
  }

  FetchApi('/server/updateInactiveUsers', 'post')

  FetchApi('/server/blockPastMeals', 'post', currentDate)
}
