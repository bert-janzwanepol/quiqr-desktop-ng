import type { ComponentContext } from './component-context'
export type { ComponentContext } from './component-context'

export interface FieldBase {
    key: string;
    compositeKey: string;
    type: string;
}

export interface FieldBaseGroup extends FieldBase {
    fields: Array<FieldBase>;
};

export interface DynamicFormNode {
    field: FieldBase;
    state: any;
    parent: DynamicFormNode;
    uiState: any;
}

export interface ComponentProps {
    context: ComponentContext
};
