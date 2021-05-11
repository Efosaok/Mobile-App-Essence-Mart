const logger = (reducer) => {
  const reducerWithLogger = (state, action) => {
    // console.log("%cPrevious State:", "color: #9E9E9E; font-weight: 700;", JSON.parse(JSON.stringify(state)))
    // console.log("%cAction:", "color: #00A7F7; font-weight: 700;", JSON.parse(JSON.stringify(action)))
    // console.log("%cNext State:", "color: #47B04B; font-weight: 700;", reducer(JSON.parse(JSON.stringify(state)), JSON.parse(JSON.stringify(action))))
    return reducer(state, action)
  }

  return reducerWithLogger
}

export default logger
