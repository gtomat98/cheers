function gaussSeidel(A, b, vetorSolucao, iteracoes) {
  let iteracao = 0
  while (iteracao < iteracoes) {
    for (let i = 0; i < A.length; i++) {
      let x = b[i]
      for (let j = 0; j < A.length; j++) {
        if (i !== j) {
          x -= A[i][j] * vetorSolucao[j]
        }
      }
      x /= A[i][i]
      vetorSolucao[i] = x
    }
    iteracao += 1
  }

  console.log(vetorSolucao)
  return vetorSolucao
}

export function getMeals(calories) {
  const carbs = (calories * 0.4) / 4
  const prots = (calories * 0.4) / 4
  const fats = (calories * 0.2) / 9

  console.log(prots, carbs, fats)
  return gaussSeidel(
    [
      [31, 1, 1],
      [0, 28, 6],
      [11, 1, 12],
    ],
    [prots, carbs, fats],
    [0, 0, 0],
    1000,
  )
}
