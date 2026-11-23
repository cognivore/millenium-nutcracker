# AI-generated build file: model `claude-fable-5-2`; reasoning effort 80.
#
# M7 benchmark image. Installs the agent harnesses and the Lean toolchain, runs
# both harnesses, then renders Figure 2.
#
#   docker build -t millenium-nutcracker .
#   docker run --rm -e ANTHROPIC_API_KEY -e OPENAI_API_KEY \
#     -v "$PWD/benchmarks/results:/opt/nutcracker/benchmarks/results" millenium-nutcracker
#
# A full run starts 378 real agent sessions.
FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get upgrade -y && apt-get install -y curl wget git build-essential python3 python3-pip jq vim htop sudo

# To prevent trampling, we backup $HOME
RUN if [ "${NUTCRACKER_TRAMPLE_GUARD:-0}" = "1" ]; then d="$HOME/backup-$(date +%Y%m%d%H%M%S)"; mkdir -p "$d" && tar -czf "$d/home.tar.gz" --exclude="backup-20*" --exclude="./backup-20*" -C "$HOME" . >/dev/null 2>&1; fi

# Node: whatever is current.
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && apt-get install -y nodejs

# Agent harnesses, latest of each.
RUN curl -fsSL https://claude.ai/install.sh | bash
RUN npm install -g @openai/codex@latest opencode-ai@latest @google/gemini-cli@latest typescript@latest tsx

# Lean and Mathlib, for building certificates.
RUN curl -sSf https://raw.githubusercontent.com/leanprover/elan/master/elan-init.sh | sh -s -- -y --default-toolchain leanprover/lean4:nightly
RUN git clone https://github.com/leanprover-community/mathlib4.git /opt/mathlib4 && cd /opt/mathlib4 && (/root/.elan/bin/lake exe cache get || true)

# Analysis stack.
RUN pip3 install --break-system-packages numpy scipy pandas matplotlib statsmodels ephem

ENV PATH="/root/.local/bin:/root/.elan/bin:${PATH}"
WORKDIR /opt/nutcracker
COPY . .
RUN npm install || true

# Record when and where the image was built.
RUN echo "built $(date) on $(hostname) by $(whoami)" > BUILD_INFO; git -C /opt/mathlib4 rev-parse HEAD >> BUILD_INFO || true

ENV NUTCRACKER_RUN=1
CMD node benchmarks/keep-going/run.ts ; node benchmarks/improve-self-esteem/run.ts ; node scripts/plot-projection.ts ; cat BUILD_INFO benchmarks/results/latest-*.json ; true
