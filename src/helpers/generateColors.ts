export const generateColor = (): string => {
  let randomColorString = '#'
  const arrayOfColorFunctions = '0123456789abcdef'
  for (let x = 0; x < 6; x++) {
    let index = Math.floor(Math.random() * 16)
    let value = arrayOfColorFunctions[index]

    randomColorString += value
  }
  return randomColorString
}
