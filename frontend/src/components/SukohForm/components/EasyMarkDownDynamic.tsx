import * as React from "react";
import FormItemWrapper from "./shared/FormItemWrapper";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Tip from "../../Tip";
import { BaseDynamic, BaseDynamicProps, BaseDynamicState } from "../../HoForm";
//import service                              from './../../../services/service'
import { EditorChange } from "codemirror";

export interface EasyMarkdownDynamicField {
  key: string;
  compositeKey: string;
  type: string;
  default?: string;
  multiLine?: boolean;
  tip?: string;
  title?: string;
}

interface EasyMarkdownDynamicProps extends BaseDynamicProps {
  context: {
    node: {
      field: EasyMarkdownDynamicField;
      state: any;
    };
    currentPath: string;
    parentPath: string;
    value: string;
    setValue: (e: EditorChange, delay: number) => void;
  };
}

const autofocusNoSpellcheckerOptions = {
  autofocus: false,
  spellChecker: false,
};

class EasyMarkdownDynamic extends BaseDynamic<EasyMarkdownDynamicProps> {
  normalizeState({ state, field }: { state: any; field: EasyMarkdownDynamicField }) {
    let key = field.key;
    if (state[key] === undefined) {
      state[key] = field.default || "";
    }
  }

  getType() {
    return "easymde";
  }

  handleChange = (value: string, e: EditorChange) => {
    this.forceUpdate();
    this.props.context.setValue(e, 250);
  };

  renderComponent() {
    let { context } = this.props;
    let { node, currentPath, parentPath } = context;
    let { field } = node;

    if (currentPath !== parentPath) {
      return null;
    }

    let iconButtons = [];
    if (field.tip) iconButtons.push(<Tip markdown={field.tip} />);

    return (
      <FormItemWrapper
        control={<SimpleMDE options={autofocusNoSpellcheckerOptions} value={context.value} onChange={this.handleChange} />}
        iconButtons={iconButtons}
      />
    );
  }
}

export default EasyMarkdownDynamic;
