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

export interface DynamicFormNode<Field extends FieldBase = FieldBase> {
    field: Field;
    state: any;
    parent: DynamicFormNode<any>;
    uiState: any;
}

interface BaseComponentProps { }

interface BaseComponentState { }

export interface ComponentProps<P extends BaseComponentProps, S extends BaseComponentState> {
    context: ComponentContext<FieldBase>
};

// FormStateBuilder type (placeholder - define properly if needed elsewhere)
export interface FormStateBuilder {
    setLevelState: (state: any, fields: Array<any>) => void;
}

// FieldsExtender type (placeholder - define properly if needed elsewhere)
export interface FieldsExtender {
    extendFields: (fields: Array<any>) => void;
}

// Helper type alias for Dynamic components - just a clearer name for BaseDynamicProps
export type BaseDynamicPropsWithContext<Field extends FieldBase> = import('./BaseDynamic').BaseDynamicProps<Field>;
