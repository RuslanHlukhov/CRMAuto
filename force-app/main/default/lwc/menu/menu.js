import { LightningElement } from 'lwc';
import AboutUsLabel from '@salesforce/label/c.AboutUs';
import HomePageLabel from '@salesforce/label/c.HomePage';
import Contact from '@salesforce/label/c.Contact';
import DealershipCenter from '@salesforce/label/c.Dealership_center';
import FollowUs from '@salesforce/label/c.Follow_Us';


export default class Menu extends LightningElement {
    label = {
        AboutUsLabel,
        HomePageLabel,
        Contact,
        DealershipCenter,
        FollowUs,
    };
}