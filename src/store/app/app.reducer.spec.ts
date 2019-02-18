import { appReducer } from './app.reducer'
import { appInitialState } from './app.reducer'
import { AppActions } from './app.actions'

const callReducer = (action: AppActions) => appReducer(appInitialState, action)

describe('app.reducer',() => {
  it('should handle AppActions.setError', () => {
    const errorMessage = '401 unauthorised'
    const result = callReducer(AppActions.setError(errorMessage));
    expect(result).toEqual({ ...appInitialState, error: errorMessage})
  })

  it('should handle AppActions.switchView', () => {
    const result = callReducer(AppActions.switchView());
    expect(result).toEqual({ ...appInitialState, viewAs: 'buyer'})
  })

  it('should handle AppActions.updateCoinPrice', () => {
    const result = callReducer(AppActions.updateCoinPrice(33.33));
    expect(result).toEqual({ ...appInitialState, coinPrice: 33.33 })
  })
})