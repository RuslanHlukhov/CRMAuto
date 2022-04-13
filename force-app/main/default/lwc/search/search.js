import { LightningElement, wire, track, api } from 'lwc';
import NewCollection from '@salesforce/label/c.New_Collection';
import translateENG from '@salesforce/apex/Translate.translateENG';
import translateRU from '@salesforce/apex/Translate.translateRU';

export default class Search extends LightningElement {

    label = {
        NewCollection
    };
    languageENG() {
        translateENG();
        window.location.reload();
    }
    languageRU(){
        translateRU();
        window.location.reload();
    }
}