import type {
  MvpProfileFormErrors,
  MvpProfileFormValues,
} from "@/services/profile/validation";

type MvpProfileFormProps = {
  initialValues: MvpProfileFormValues;
  errors?: MvpProfileFormErrors;
  formError?: string;
  submitLabel?: string;
  action?: (formData: FormData) => void | Promise<void>;
};

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} role="alert" className="ui-field-error">
      {message ?? ""}
    </p>
  );
}

export function MvpProfileForm({
  initialValues,
  errors,
  formError,
  submitLabel = "Save profile",
  action,
}: MvpProfileFormProps) {
  return (
    <form action={action} className="ui-form ui-card">
      <FieldError id="profile-form-error" message={formError} />

      <section className="ui-form-section" aria-label="Core profile details">
        <h2 className="ui-form-section-title">Core profile details</h2>
        <div className="ui-field">
          <label htmlFor="profile-display-name">Display name</label>
          <input
            id="profile-display-name"
            name="display_name"
            type="text"
            required
            defaultValue={initialValues.display_name}
            aria-invalid={Boolean(errors?.display_name)}
            aria-describedby="profile-display-name-error"
          />
          <FieldError id="profile-display-name-error" message={errors?.display_name} />
        </div>

        <div className="ui-field">
          <label htmlFor="profile-dota-nickname">Dota nickname</label>
          <input
            id="profile-dota-nickname"
            name="dota_nickname"
            type="text"
            required
            defaultValue={initialValues.dota_nickname}
            aria-invalid={Boolean(errors?.dota_nickname)}
            aria-describedby="profile-dota-nickname-error"
          />
          <FieldError
            id="profile-dota-nickname-error"
            message={errors?.dota_nickname}
          />
        </div>

        <div className="ui-field">
          <label htmlFor="profile-rank">Rank</label>
          <input
            id="profile-rank"
            name="rank"
            type="text"
            required
            defaultValue={initialValues.rank}
            aria-invalid={Boolean(errors?.rank)}
            aria-describedby="profile-rank-error"
          />
          <FieldError id="profile-rank-error" message={errors?.rank} />
        </div>
      </section>

      <hr className="ui-divider" />

      <section className="ui-form-section" aria-label="Play preferences">
        <h2 className="ui-form-section-title">Play preferences</h2>
        <div className="ui-field">
          <label htmlFor="profile-preferred-roles">Preferred roles</label>
          <input
            id="profile-preferred-roles"
            name="preferred_roles"
            type="text"
            required
            defaultValue={initialValues.preferred_roles.join(", ")}
            aria-invalid={Boolean(errors?.preferred_roles)}
            aria-describedby="profile-preferred-roles-help profile-preferred-roles-error"
          />
          <p id="profile-preferred-roles-help" className="ui-muted">
            Use comma-separated values.
          </p>
          <FieldError
            id="profile-preferred-roles-error"
            message={errors?.preferred_roles}
          />
        </div>

        <div className="ui-field">
          <label htmlFor="profile-language">Language</label>
          <input
            id="profile-language"
            name="language"
            type="text"
            required
            defaultValue={initialValues.language}
            aria-invalid={Boolean(errors?.language)}
            aria-describedby="profile-language-error"
          />
          <FieldError id="profile-language-error" message={errors?.language} />
        </div>

        <div className="ui-field">
          <label htmlFor="profile-region">Region</label>
          <input
            id="profile-region"
            name="region"
            type="text"
            required
            defaultValue={initialValues.region}
            aria-invalid={Boolean(errors?.region)}
            aria-describedby="profile-region-error"
          />
          <FieldError id="profile-region-error" message={errors?.region} />
        </div>
      </section>

      <hr className="ui-divider" />

      <section className="ui-form-section" aria-label="Additional details">
        <h2 className="ui-form-section-title">Additional details</h2>
        <div className="ui-field">
          <label htmlFor="profile-bio">Bio</label>
          <textarea
            id="profile-bio"
            name="bio"
            rows={4}
            defaultValue={initialValues.bio ?? ""}
            aria-invalid={Boolean(errors?.bio)}
            aria-describedby="profile-bio-error"
          />
          <FieldError id="profile-bio-error" message={errors?.bio} />
        </div>

        <div className="ui-field">
          <div className="ui-checkbox-field">
            <input
              id="profile-looking-for-team"
              name="looking_for_team"
              type="checkbox"
              defaultChecked={initialValues.looking_for_team}
              aria-invalid={Boolean(errors?.looking_for_team)}
              aria-describedby="profile-looking-for-team-error"
            />
            <label htmlFor="profile-looking-for-team">Looking for team</label>
          </div>
          <FieldError
            id="profile-looking-for-team-error"
            message={errors?.looking_for_team}
          />
        </div>
      </section>

      <button type="submit">{submitLabel}</button>
    </form>
  );
}

export const ProfileEditForm = MvpProfileForm;
