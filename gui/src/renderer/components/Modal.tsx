import { StyleSheet, css } from 'aphrodite';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { colors } from '../../config.json';
import ImageView from './ImageView';

const MODAL_CONTAINER_ID = 'modalContainer';

const styles = StyleSheet.create({
  modalAlertBackground: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: '26px 14px 14px',
    height: '100%',
  },
  modalAlert: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.darkBlue,
    borderRadius: '11px',
    padding: '16px',
    maxHeight: '100%',
  },
  modalAlertIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '8px',
  },
  modalAlertMessageContainer: {
    overflow: 'scroll',
    marginTop: '16px',
  },
  modalAlertMessage: {
    fontFamily: 'Open Sans',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    color: colors.white80,
    ':not(:first-child)': {
      marginTop: '16px',
    },
  },
  modalAlertButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '16px',
  },
  modalContent: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    position: 'relative',
    flex: 1,
  },
});

interface IModalContentProps {
  children?: React.ReactNode;
}

export const ModalContent: React.FC = (props: IModalContentProps) => {
  return <div className={css(styles.modalContent)}>{props.children}</div>;
};

interface IModalBackgroundProps {
  children?: React.ReactNode;
}

const ModalBackground: React.FC = (props: IModalBackgroundProps) => {
  return <div className={css(styles.modalBackground)}>{props.children}</div>;
};

interface IModalContainerProps {
  children?: React.ReactNode;
}

export const ModalContainer: React.FC = (props: IModalContainerProps) => {
  return (
    <div id={MODAL_CONTAINER_ID} className={css(styles.modalContainer)}>
      <ModalContent>{props.children}</ModalContent>
    </div>
  );
};

export enum ModalAlertType {
  Info = 1,
  Warning,
}

interface IModalAlertProps {
  type?: ModalAlertType;
  message?: string;
  buttons: React.ReactNode[];
  children?: React.ReactNode;
}

export class ModalAlert extends React.Component<IModalAlertProps> {
  private element = document.createElement('div');
  private modalContainer?: Element;

  public componentDidMount() {
    const modalContainer = document.getElementById(MODAL_CONTAINER_ID);
    if (modalContainer) {
      this.modalContainer = modalContainer;
      setTimeout(() => {
        modalContainer.appendChild(this.element);
      });
    } else {
      throw Error('Modal container not found when mounting modal');
    }
  }

  public componentWillUnmount() {
    if (this.modalContainer) {
      this.modalContainer.removeChild(this.element);
    }
  }

  public render() {
    return ReactDOM.createPortal(this.renderModal(), this.element);
  }

  private renderModal() {
    return (
      <ModalBackground>
        <div className={css(styles.modalAlertBackground)}>
          <div className={css(styles.modalAlert)}>
            {this.props.type && (
              <div className={css(styles.modalAlertIcon)}>
                {this.renderTypeIcon(this.props.type)}
              </div>
            )}
            <div className={css(styles.modalAlertMessageContainer)}>
              {this.props.message && <ModalMessage>{this.props.message}</ModalMessage>}
              {this.props.children}
            </div>
            {this.props.buttons.map((button, index) => (
              <div key={index} className={css(styles.modalAlertButtonContainer)}>
                {button}
              </div>
            ))}
          </div>
        </div>
      </ModalBackground>
    );
  }

  private renderTypeIcon(type: ModalAlertType) {
    let source = '';
    let color = '';
    switch (type) {
      case ModalAlertType.Info:
        source = 'icon-alert';
        color = colors.white;
        break;
      case ModalAlertType.Warning:
        source = 'icon-alert';
        color = colors.red;
        break;
    }
    return <ImageView height={44} width={44} source={source} tintColor={color} />;
  }
}

interface IModalMessageProps {
  children?: string;
}

export function ModalMessage(props: IModalMessageProps) {
  return <p className={css(styles.modalAlertMessage)}>{props.children}</p>;
}
