import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return '';
        return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
            return index === 0 ? letter.toUpperCase() : letter.toLowerCase();
            console.log(letter);
        }).replace(/\s+/g, '');
    }
}