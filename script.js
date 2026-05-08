// IMPORTANT: Replace these with your actual Supabase project URL and anon key
// You can find these in your Supabase Dashboard -> Settings -> API
const supabaseUrl = 'https://pctfvisrctttkowbglhu.supabase.co/Contact';
const supabaseKey = 'sb_publishable_3xxIC7CGgmyyxtKiG2MtqA_W7wBxahm';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Show loading state on button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Insert data into Supabase "Contacts" table
                const { data, error } = await supabase
                    .from('Contacts')
                    .insert([
                        {
                            name: name,
                            email: email,
                            subject: subject,
                            message: message
                        }
                    ]);

                if (error) {
                    throw error;
                }

                // Success alert and form reset
                alert('Message sent successfully! Thank you for reaching out.');
                contactForm.reset();
            } catch (error) {
                console.error('Error saving message:', error.message);
                alert('Failed to send message. Make sure your Supabase URL/Key are set correctly.');
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
