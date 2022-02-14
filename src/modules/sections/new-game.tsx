import Logo from '../../assets/logo.svg';
import IconX from '../svg/icon-x';
import IconO from '../svg/icon-o';

export default function NewGame() {
  return (
    <section className="section-new-game-root">
      <div className="logo-container">
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <div className="pick-mark">
        <h1 className='title'>PICK PLAYER 1'S MARK</h1>
        <div className="choice">
          <input type="radio" id="choose-x" value="mark x" name="pick-mark" />
          <label htmlFor="choose-x" aria-label='choose mark x'>
            <IconX />
          </label>
          <input type="radio" id="choose-o" value="mark o" name="pick-mark" />
          <label htmlFor="choose-o" aria-label='choose mark o'>
            <IconO />
          </label>
        </div>
        <div className="note">REMEMBER : X GOES FIRST</div>
      </div>
      <div className="start-game-buttons">
        <button className="button vs-cpu"><span>NEW GAME (VS CPU)</span></button>
        <button className="button vs-player"><span>NEW GAME (VS PLAYER)</span></button>
      </div>
    </section>
  );
}
