'use strict'

module.exports = {
  confirmations: {
    confirm: {
      title: 'IrisRPG | Account Confirmed',
      paragraph: 'Your account has been successfully confirmed...',
      footer: {
        paragraph1: 'You can now sign in to your IrisRPG account to use the application.',
        paragraph2: '             Thanks for your patience'
      }
    }
  },
  passwords: {
    edit: {
      title: 'IrisRPG | Change Password',
      header: 'Change Password',
      paragraph: 'Enter a password to update your account.',
      action: 'Change my password',
      fields: {
        password: 'Password',
        password_confirmation: 'Password confirmation'
      }
    },
    update: {
      title: 'IrisRPG | Changed Password',
      paragraph: 'Password changed successfully...',
      footer: {
        paragraph1: 'Now you can log in to your account with updated password.',
        paragraph2: '             Thank you for your patience.'
      }
    }
  },
  unlocks: {
    confirm: {
      title: 'IrisRPG | Unlocked Account',
      paragraph: 'Your account has been successfully unblocked....',
      footer: {
        paragraph1: 'You can now re-login to your IrisRPG account.',
        paragraph2: '             Thanks for your patience'
      }
    }
  }
}
