// netlify/functions/submit-form.js
exports.handler = async (event, context) => {
  // Hanya terima POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  try {
    // Parse data yang dikirim
    const data = JSON.parse(event.body);
    
    // Log data untuk demo (dalam realita, ini data yang dicuri)
    console.log('📨 [DEMO PHISHING] Data form diterima:', {
      // Data sensitif (disensor untuk log)
      email: data.email ? `${data.email.substring(0, 3)}...@...` : 'N/A',
      hasPassword: !!data.password,
      hasPhone: !!data.phone,
      fullName: data.fullName || 'N/A',
      // Metadata
      isDemo: data.isDemo || false,
      ip: event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'N/A',
      userAgent: event.headers['user-agent'],
      timestamp: data.timestamp || new Date().toISOString(),
      // URL referer
      referer: event.headers.referer || 'N/A'
    });

    // Dalam phishing NYATA, data akan:
    // 1. Disimpan ke database
    // 2. Dikirim ke email hacker
    // 3. Dikirim ke Telegram bot
    // 4. Diproses untuk hack akun
    
    // TAPI ini hanya demo, jadi kita hanya return pesan edukasi
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        success: true,
        message: '✅ Form submitted (DEMO ONLY)',
        educational_note: 'Ini hanya simulasi! Dalam phishing NYATA:',
        what_happens: [
          '1. Email & password Anda dicatat',
          '2. Penyerang coba login ke akun Anda',
          '3. Jika password sama, akun lain juga kena',
          '4. Data pribadi bisa dijual di dark web',
          '5. Kemungkinan penipuan finansial'
        ],
        protection_tips: [
          '🔒 Selalu periksa URL sebelum isi form',
          '🔒 Google tidak pernah minta password via form',
          '🔒 Gunakan 2-factor authentication',
          '🔒 Gunakan password manager',
          '🔒 Laporkan phishing ke reportphishing@google.com'
        ],
        demo_data_received: {
          // Jangan return data sensitif
          fields_received: Object.keys(data).filter(k => k !== 'password'),
          has_password: !!data.password,
          is_demo: data.isDemo || false
        },
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('❌ Error processing form:', error);
    
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Invalid data format',
        details: error.message,
        note: 'Demo error - ini hanya simulasi'
      })
    };
  }
};
