import PropTypes from 'prop-types';
import styles from '../Wrapper/Wrapper.module.css';

function Wrapper({ title, children }) {
  return (
    <section>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  );
}

Wrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Wrapper;
