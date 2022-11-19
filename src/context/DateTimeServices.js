export const conversiDateTimeIDN = (currentDate) => {
    var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var dateDataIDN = new Date(currentDate);
    var tanggal = dateDataIDN.getDate();
    var xhari = dateDataIDN.getDay();
    var xbulan = dateDataIDN.getMonth();
    var xtahun = dateDataIDN.getYear();
  
    var hari = hari[xhari];
    var bulan = bulan[xbulan];
    var tahun = xtahun < 1000 ? xtahun + 1900 : xtahun;
  
    var tglIDN = hari + ", " + tanggal + " " + bulan + " " + tahun;
    return tglIDN;
  };
