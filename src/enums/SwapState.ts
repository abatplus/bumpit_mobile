enum SwapState {
  initial = 'initial',
  received = 'received',
  accepted = 'accepted',
  requested = 'requested',
  exchanged = 'exchanged',
  // TODO: check if needed!! not willing to exchange card data
  // denied = 'denied',
}

export default SwapState;
