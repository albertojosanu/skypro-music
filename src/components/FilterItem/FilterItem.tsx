import classNames from 'classnames';
import styles from './filterItem.module.css';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getUniqueValuesByKey } from '@/utils/helpers';

export default function FilterItem(props: {
  children: string;
  type: keyof TrackType;
  activeFilter: [string, React.Dispatch<React.SetStateAction<string>>];
  visible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  return (
    <div>
      <div
        className={classNames(styles.filter__button, {
          [styles.active]:
            props.activeFilter[0] === props.type && props.visible[0],
        })}
        onClick={() => {
          (props.activeFilter[1](props.type),
            props.activeFilter[0] === props.type
              ? props.visible[1](!props.visible[0])
              : props.visible[1](true));
        }}
      >
        {props.children}
      </div>

      {props.visible[0] && props.activeFilter[0] === props.type && (
        <div className={styles.filter__window}>
          <ul className={styles.filter__list}>
            {props.type === 'release_date'
              ? ['По умолчанию', 'Сначала новые', 'Сначала старые'].map(
                  (element, index) => <li key={index}>{element}</li>,
                )
              : getUniqueValuesByKey(data, props.type).map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}
