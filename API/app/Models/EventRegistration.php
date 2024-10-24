<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    use HasFactory;

    protected $table = 'event_registrations';

    protected $fillable = [
        'nama_peserta',
        'nama_event',
        'tanggal_event',
        'nomor_pendaftaran',
        'kategori',
    ];
}
