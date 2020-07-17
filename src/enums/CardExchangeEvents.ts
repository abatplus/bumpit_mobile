const enum CardExchangeEvent {
    Subscribed = 'Subscribed',
    Unsubscribed = 'Unsubscribed',
    Updated = 'Updated',
    CardExchangeRequested = 'CardExchangeRequested',
    WaitingForAcceptance = 'WaitingForAcceptance',
    CardExchangeAccepted = 'CardExchangeAccepted',
    AcceptanceSent = 'AcceptanceSent',
    CardDataReceived = 'CardDataReceived',
    CardDataSent = 'CardDataSent'
}
export default CardExchangeEvent;