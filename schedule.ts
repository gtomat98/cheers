const cron = require('node-cron')
const axios = require('axios')

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

type FetchProps = (
  url: string,
  method: 'post' | 'get' | 'put' | 'delete',
  data?: any,
) => Promise<void>

const executeTask = async () => {
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

// Agendar para executar todos os dias à meia-noite
cron.schedule('0 0 * * *', executeTask)
