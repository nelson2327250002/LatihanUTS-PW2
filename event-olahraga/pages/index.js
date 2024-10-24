import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({
    nama_peserta: '',
    nama_event: '',
    tanggal_event: '',
    nomor_registrasi: '',
    kategori: 'Adult',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/registrasi-event');
      setRegistrations(response.data.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/registrasi-event', formData);
      fetchData();
      setFormData({
        nama_peserta: '',
        nama_event: '',
        tanggal_event: '',
        nomor_registrasi: '',
        kategori: '',
      });
    } catch (error) {
      console.error('Error adding registration', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Registrasi Event Olahraga</h1>

      <table className="table table-bordered mb-5">
        <thead>
          <tr>
            <th>Nama Peserta</th>
            <th>Nama Event</th>
            <th>Tanggal Event</th>
            <th>Nomor Registrasi</th>
            <th>Kategori</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.id}>
              <td>{registration.nama_peserta}</td>
              <td>{registration.nama_event}</td>
              <td>{registration.tanggal_event}</td>
              <td>{registration.nomor_registrasi}</td>
              <td>{registration.kategori}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mb-4">Tambah Registrasi Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Peserta</label>
          <input
            type="text"
            className="form-control"
            value={formData.nama_peserta}
            onChange={(e) => setFormData({ ...formData, nama_peserta: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nama Event</label>
          <input
            type="text"
            className="form-control"
            value={formData.nama_event}
            onChange={(e) => setFormData({ ...formData, nama_event: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Event</label>
          <input
            type="date"
            className="form-control"
            value={formData.tanggal_event}
            onChange={(e) => setFormData({ ...formData, tanggal_event: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nomor Registrasi</label>
          <input
            type="text"
            className="form-control"
            value={formData.nomor_registrasi}
            onChange={(e) => setFormData({ ...formData, nomor_registrasi: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <select
            className="form-select"
            value={formData.kategori}
            onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
            required
          >
            <option value="Adult">Adult</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Tambah Registrasi</button>
      </form>
    </div>
  );
}
