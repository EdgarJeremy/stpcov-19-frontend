import React from 'react';
import SocketIO from 'socket.io-client';
import './App.css';

const socket = SocketIO(process.env.REACT_APP_API_URL);

class App extends React.Component {
  state = {
    temp: '',
    distance: ''
  }
  componentDidMount() {
    socket.on('connect', () => {
      socket.on('update', (data) => {
        this.setState(data);
      })
    });
  }
  render() {
    const { temp, distance } = this.state;
    const level = ((distance - 20) * 10) / (40 / 20);
    return (
      <div>
        <div className="header">
          <h1 className="app-title">STPCov-19</h1>
          <p className="app-subtitle">Sistem Monitoring Suhu dan Air Pada Tempat Cuci Tangan Publik di Kabupaten Minahasa Tenggara Menggunakan Raspberry Pi berbasis IoT</p>
        </div>
        <div className="container">
          <div className="water-level">
            <div id="frame">
              <img style={{ top: `${level}%` }} src={require('./water.png')} /><img style={{ top: `${level}%` }} src={require('./water.png')} />
            </div>
          </div>
          <div className="temperature">
            {temp}°C
          </div>
        </div>
      </div>
    )
  }
}

export default App;
