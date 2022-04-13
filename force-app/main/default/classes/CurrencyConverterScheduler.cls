global class CurrencyConverterScheduler implements Schedulable {

    global void execute(SchedulableContext SC) {
        CurrencyConverter.getCurrencies();
    }

    public CurrencyConverterScheduler() {

    }
}
