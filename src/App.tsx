import React from 'react';

// Определение типов
export interface Param {
  id: number;
  name: string;
  type: 'string' | 'number' | 'list';
  options?: string[];
}

export interface ParamValue {
  paramId: number;
  value: string | number;
}

export interface Model {
  paramValues: ParamValue[];
}

export interface Props {
  params: Param[];
  model: Model;
}

export interface State {
  model: Model;
}

// Компонент ParamEditor
export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      model: props.model,
    };
  }

  handleChange = (paramId: number, value: string | number) => {
    this.setState((prevState) => {
      const newParamValues = prevState.model.paramValues.map((paramValue) => {
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
    const wrapperStyles = {
      padding: '15px',
    }
    // Встроенные стили для компонента ParamEditor
    const editorStyles = {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      marginBottom: '20px',
      maxWidth: '400px',
    };

    // Встроенные стили для label
    const labelStyles = {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    };

    // Встроенные стили для input и select
    const inputStyles = {
      padding: '5px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      width: '100%',
      marginBottom: '10px',
      maxWidth: '97%'
    };
    return (
      <div style={wrapperStyles}>
        {this.props.params.map((param) => (
          <div
            style={editorStyles}
            key={param.id}>
            <label style={labelStyles}>{param.name}</label>
            {param.type === 'string' && (
              <input
                type="text"
                style={inputStyles}
                value={
                  this.state.model.paramValues.find(
                    (paramValue) => paramValue.paramId === param.id
                  )?.value || ''
                }
                onChange={(e) => this.handleChange(param.id, e.target.value)}
              />
            )}
            {param.type === 'number' && (
              <input
                type="number"
                style={inputStyles}
                value={
                  this.state.model.paramValues.find(
                    (paramValue) => paramValue.paramId === param.id
                  )?.value || 0
                }
                onChange={(e) => this.handleChange(param.id, Number(e.target.value))}
              />
            )}
            {param.type === 'list' && (
              <select
                style={inputStyles}
                value={
                  this.state.model.paramValues.find(
                    (paramValue) => paramValue.paramId === param.id
                  )?.value || ''
                }
                onChange={(e) => this.handleChange(param.id, e.target.value)}
              >
                {param.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    );
  }
}

// Пример использования компонента ParamEditor
export class App extends React.Component {
  render() {
    const params: Param[] = [
      { id: 1, name: 'Назначение', type: 'string' },
      { id: 2, name: 'Длина', type: 'number' },
      { id: 4, name: 'Материал', type: 'string' },
      { id: 3, name: 'Цвет', type: 'list', options: ['красный', 'синий', 'зеленый'] },
      // Можно добавить другие параметры
    ];

    const model: Model = {
      paramValues: [
        { paramId: 1, value: 'повседневное' },
        { paramId: 2, value: 10 },
        { paramId: 4, value: 'шерсть' },
        { paramId: 3, value: 'красный' },
        // Можно добавить другие значения параметров
      ],
    };

    const titleStyles = {
      padding: '15px',
    }
    return (
      <div>
        <h1 style={titleStyles}>Редактор параметров</h1>
        <ParamEditor params={params} model={model} />
      </div>
    );
  }
}

export default App;