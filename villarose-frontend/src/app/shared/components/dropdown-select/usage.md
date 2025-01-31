# Dropdown Select

```ts
value: undefined | boolean = undefined;

```

```html
<!--label is also used for the id-->
<app-dropdown-select
    [label]="'label-name'"
    [options]="[
        { id: true, name: 'Yes' },
        { id: false, name: 'No' },
        { id: undefined, name: 'Maybe' }
    ]"
    (selectedOptionChange)="value = $event"
    [(selectedOption)]="value"></app-dropdown-select>
```

Options is a always a json array of objects with the following structure:

```ts
{
    id: any,
    name: string
}
```

the Id will be the value used in typescript and other logic, the name will be the value displayed in the dropdown.
