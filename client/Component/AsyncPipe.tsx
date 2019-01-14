import React, { PureComponent } from 'react';
import { Observable, Subscription } from 'rxjs';

interface IProps {
  initialValue?: any;
  stream: Observable<any>;
  children: (value: any) => React.ReactNode;
}

interface IState {
  value: any;
}

class AsyncPipe extends PureComponent<IProps, IState> {
  public state: IState = {
    value: this.props.initialValue,
  };

  private subscription: Subscription;

  public componentDidMount() {
    this.subscription = this.props.stream.subscribe((value) => {
      this.setState({ value });
    });
  }

  public componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  public render() {
    return this.props.children(this.state.value);
  }
}

export default AsyncPipe;
