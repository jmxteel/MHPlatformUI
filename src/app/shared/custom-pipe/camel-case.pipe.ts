<<<<<<< HEAD
import { Pipe, PipeTransform } from "@angular/core";
=======
import { Pipe, PipeTransform } from '@angular/core';
>>>>>>> 1193485ec2e4ab0cb36b47f89aea5dabd0cde5e5

@Pipe({
    name: 'camelCase'
})
<<<<<<< HEAD

export class CamelCasePipe implements PipeTransform{
    transform(value: string | null | undefined): string {
        if (!value) return '';
        return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
            return index === 0 ? letter.toUpperCase() : letter.toLocaleLowerCase();
        }).replace(/\s+/g, ''); 
=======
export class CamelCasePipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return '';
        return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
            return index === 0 ? letter.toUpperCase() : letter.toLowerCase();
            console.log(letter);
        }).replace(/\s+/g, '');
>>>>>>> 1193485ec2e4ab0cb36b47f89aea5dabd0cde5e5
    }
}