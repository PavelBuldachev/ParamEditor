import React from 'react';

export interface Param {
    id: number;
    name: string;
    type: 'string';
}

export interface ParamValue {
    paramId: number;
    value: string;
}

export interface Color {
    // Вот пример определения интерфейса Color с несколькими свойствами
    red: number;
    green: number;
    blue: number;
    alpha?: number; // Альфа-канал для прозрачности, опционально
}

export interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

export interface Props {
    params: Param[];
    model: Model;
}

export interface State {
    model: Model;
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            model: props.model,
        };
    }

    handleChange = (paramId: number, value: string) => {
        this.setState(prevState => {
            const newParamValues = prevState.model.paramValues.map(paramValue => {
                if (paramValue.paramId === paramId) {
                    return { ...paramValue, value };
                }
                return paramValue;
            });
            return { model: { ...prevState.model, paramValues: newParamValues } };
        });
    };

    getModel = (): Model => {
        return this.state.model;
    };

    render() {
        return (
            <div>
                {this.props.params.map(param => (
                    <div key={param.id}>
                        <label>{param.name}</label>
                        <input
                            type="text"
                            value={
                                this.state.model.paramValues.find(
                                    paramValue => paramValue.paramId === param.id
                                )?.value || ''
                            }
                            onChange={e => this.handleChange(param.id, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default ParamEditor;